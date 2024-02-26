import { BiSolidVolume, BiSolidVolumeMute } from 'react-icons/bi';

import useSoundEnabled from "../hooks/useSoundEnabled";

export default function SoundEnabled() {
    const [soundEnabled, setSoundEnabled] = useSoundEnabled();

    return (
        <div className="fixed top-0 right-0 p-5 z-50">
            <button
                onClick={(e) => {
                    setSoundEnabled(!soundEnabled)
                }}
                className="text-red-700 p-2 text-2xl"
            >
                {soundEnabled ? <BiSolidVolume /> : <BiSolidVolumeMute />}
            </button>
        </div>
    );
}