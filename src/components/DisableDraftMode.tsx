"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
    const environment = useDraftModeEnvironment();
    const router = useRouter();

    // Only show the disable draftMode button when outside of presentation tool
    if (environment !== "live" && environment !== "unknown") {
        return null;
    }

    const handleClick = async () => {
        try {
            const response = await fetch("/draft-mode/disable", {
                method: "POST",
            });

            if (response.ok) {
                router.refresh(); // Refresh the page to exit draft mode
            } else {
                console.error("Failed to disable draft mode.");
            }
        } catch (error) {
            console.error("Error disabling draft mode:", error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-4 right-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md shadow-md hover:bg-gray-100 z-50 transition-colors"
        >
            Disable Draft Mode
        </button>
    );
}