import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

const DEFAULT_ITEMS = [
    {
        title: 'Executive SUVs',
        description: 'Chevrolet Suburban & GMC Yukon XL. Space, comfort, and security for corporate executives.',
        id: 1,
        image: '/carousel-img/2026-suburban-mov-design-02-v2.avif',
        tag: 'FLEET'
    },
    {
        title: 'Professional Chauffeurs',
        description: 'Vetted, background-checked, and highly credentialed drivers dedicated to client safety and discretion.',
        id: 2,
        image: '/carousel-img/Profile_a3cdee2d-dcae-45a1-9ac0-67df4e3c3965.webp',
        tag: 'CHAUFFEURS'
    },
    {
        title: 'Luxury Sedans',
        description: 'Mercedes-Benz S-Class, BMW 7-Series, and Audi A8. Arrive in style, comfort, and prestige.',
        id: 3,
        image: '/carousel-img/images (1).jpg',
        tag: 'FLEET'
    },
    {
        title: 'Corporate Sprinters',
        description: 'Executive Mercedes-Benz Sprinters for team transfers, events, and delegation logistics.',
        id: 4,
        image: '/carousel-img/images.jpg',
        tag: 'FLEET'
    }
];

const DRAG_BUFFER = 0;
const INSTANT_TRANSITION = { duration: 0 };
const VELOCITY_THRESHOLD = 500;
const GAP = 20;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, trackItemOffset, x }) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const outputRange = [45, 0, -45];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className="carousel-item"
            style={{
                width: itemWidth,
                height: '100%',
                rotateY: rotateY
            }}
        >
            {item.image && (
                <div className="carousel-item-img-container">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="carousel-item-img"
                        draggable="false"
                    />
                    <div className="carousel-item-overlay" />
                </div>
            )}

            <div className="carousel-item-body">
                {item.tag && <span className="carousel-item-tag">{item.tag}</span>}
                <div className="carousel-item-content">
                    <h3 className="carousel-item-title">{item.title}</h3>
                    <p className="carousel-item-description">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 400,
    autoplay = true,
    autoplayDelay = 4000,
    pauseOnHover = true,
    loop = true
}) {
    const containerPadding = 16;

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(baseWidth);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = Math.min(entry.contentRect.width || baseWidth, baseWidth);
                setContainerWidth(width);
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [baseWidth]);

    const itemWidth = containerWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);

    // Tracks the in-flight imperative animation so a drag can cancel it instantly.
    const activeAnimationRef = useRef(null);

    // Reset to the correct starting slide only when the actual item set changes
    // (NOT on every resize — trackItemOffset is intentionally excluded here).
    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length, loop]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    // This is the ONLY place that moves x for a real slide change.
    // It is entirely separate from drag — drag controls x directly via the
    // gesture, and this effect is what fires afterward once `position` settles.
    useEffect(() => {
        const target = -(position * trackItemOffset);

        activeAnimationRef.current?.stop();
        const controls = animate(x, target, isJumping ? INSTANT_TRANSITION : SPRING_OPTIONS);
        activeAnimationRef.current = controls;

        controls.then(() => {
            if (!loop || itemsForRender.length <= 1) {
                return;
            }
            const lastCloneIndex = itemsForRender.length - 1;

            if (position === lastCloneIndex) {
                setIsJumping(true);
                setPosition(1);
                x.set(-1 * trackItemOffset);
            } else if (position === 0) {
                setIsJumping(true);
                setPosition(items.length);
                x.set(-items.length * trackItemOffset);
            } else if (isJumping) {
                setIsJumping(false);
            }
        });

        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, trackItemOffset]);

    // Kill any in-flight programmatic animation the instant a drag starts,
    // so drag and the snap-animation never fight over the same value.
    const handleDragStart = () => {
        activeAnimationRef.current?.stop();
    };

    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) {
            // Snap back to the current slide since the drag didn't clear the threshold.
            const target = -(position * trackItemOffset);
            activeAnimationRef.current?.stop();
            activeAnimationRef.current = animate(x, target, SPRING_OPTIONS);
            return;
        }

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className="carousel-container"
            style={{
                width: '100%',
                maxWidth: `${containerWidth}px`
            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                    x
                }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth}
                        trackItemOffset={trackItemOffset}
                        x={x}
                    />
                ))}
            </motion.div>
            <div className="carousel-indicators-container">
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.button
                            type="button"
                            key={index}
                            className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={activeIndex === index}
                            animate={{
                                scale: activeIndex === index ? 1.25 : 1
                            }}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}