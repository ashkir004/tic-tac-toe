
// trapfocus inside board
export function trapFocusBoard(node: HTMLElement) {

    function updateFocus() {
        // Check if overlay is visible
        const overlay = node.querySelector<HTMLElement>('.overlay.show');
        let focusableElements: NodeListOf<HTMLElement>;
        
        if (overlay) {
            // Trap focus on overlay
            focusableElements = overlay.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
        } else {
            // Trap focus on board cells
            focusableElements = node.querySelectorAll<HTMLElement>(
                '.game-board button:not([disabled])'
            );
        }
        
        return {
            firstElement: focusableElements[0],
            lastElement: focusableElements[focusableElements.length - 1],
            focusableElements
        };
    }

    function handleKeyDown(event: KeyboardEvent) {
        const { firstElement, lastElement } = updateFocus();
        const overlay = node.querySelector<HTMLElement>('.overlay.show');
        
        if (!firstElement || !lastElement) return;
        
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        // Escape key - focus on reset button when in play (no overlay)
        if (event.key === 'Escape' && !overlay) {
            event.preventDefault();
            const resetButton = document.querySelector<HTMLButtonElement>('.btn-reset');
            if (resetButton) {
                resetButton.focus();
            }
        }
    }

    // Move focus to overlay when it appears — save previous focus and restore on close
    let previousFocus: Element | null = null;
    const observer = new MutationObserver(() => {
        const overlay = node.querySelector<HTMLElement>('.overlay.show');
        if (overlay) {
            // Save the currently focused element so we can restore it when overlay closes
            if (!previousFocus) {
                previousFocus = document.activeElement as Element | null;
            }

            const { firstElement } = updateFocus();
            if (firstElement) {
                firstElement.focus();
            }
        } else {
            // Overlay closed — restore previous focus if possible
            if (previousFocus) {
                try {
                    const el = previousFocus as HTMLElement;
                    if (el && typeof el.focus === 'function' && document.contains(el)) {
                        el.focus();
                    } else {
                        // fallback to first board control or reset button
                        const fallback = node.querySelector<HTMLElement>('.game-board button:not([disabled])') || document.querySelector<HTMLElement>('.btn-reset');
                        if (fallback) fallback.focus();
                    }
                } catch {
                    const fallback = node.querySelector<HTMLElement>('.game-board button:not([disabled])') || document.querySelector<HTMLElement>('.btn-reset');
                    if (fallback) fallback.focus();
                }
            }
            previousFocus = null;
        }
    });

    observer.observe(node, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });

    node.addEventListener('keydown', handleKeyDown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeyDown);
            observer.disconnect();
        }
    };
}