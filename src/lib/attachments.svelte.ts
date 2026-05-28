
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

    // Move focus to overlay when it appears
    const observer = new MutationObserver(() => {
        const overlay = node.querySelector<HTMLElement>('.overlay.show');
        if (overlay) {
            const { firstElement } = updateFocus();
            if (firstElement) {
                firstElement.focus();
            }
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