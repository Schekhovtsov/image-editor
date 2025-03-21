import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalTypeParams = {
    children: ReactNode;
}

export const Portal = ({ children }: PortalTypeParams) => {
    const [container] = useState(document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return createPortal(children, container);
};
