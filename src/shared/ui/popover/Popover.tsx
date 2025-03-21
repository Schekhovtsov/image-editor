import {
    FC,
    MouseEvent,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';

type PopoverProps = {
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
    targetRef?: RefObject<HTMLElement> | null;
    clickEvent?: MouseEvent<Element, globalThis.MouseEvent> | null;
};

export const Popover: FC<PopoverProps> = ({
    isOpen,
    close,
    children,
    targetRef,
    clickEvent,
}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const popoverRef = useRef<HTMLDivElement>(null);

    const calculatePositionFromRef = () => {
        if (targetRef?.current) {
            const rect = targetRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    };

    const calculatePositionFromClick = (clickEvent: MouseEvent) => {
        console.log(clickEvent);
        if (clickEvent) {
            setPosition({
                top: clickEvent.clientY + window.scrollY,
                left: clickEvent.clientX + window.scrollX,
            });
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target as Node) &&
            (!targetRef?.current ||
                !targetRef.current.contains(event.target as Node))
        ) {
            close();
        }
    };

    useEffect(() => {
        if (targetRef) {
            calculatePositionFromRef();
        } else if (clickEvent) {
            calculatePositionFromClick(clickEvent);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clickEvent]);

    return (
        isOpen && (
            <div
                ref={popoverRef}
                style={{
                    position: 'fixed',
                    top: position.top,
                    left: position.left,
                    zIndex: 1000,
                }}
            >
                {children}
            </div>
        )
    );
};
