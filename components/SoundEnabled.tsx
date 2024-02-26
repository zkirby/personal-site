import { useAtom } from 'jotai';
import { BiSolidVolumeLow, BiSolidVolumeMute } from 'react-icons/bi';
import { soundEnabledAtom } from '../state/sound.atoms';


export default function SoundEnabled() {
    const [soundEnabled, setSoundEnabled] = useAtom(soundEnabledAtom);

    return (
        <div className="fixed top-0 right-0 p-5 z-50">
            <button
                onClick={(e) => {
                    setSoundEnabled(!soundEnabled)
                    e.stopPropagation()
                }}
                className="text-red-700 p-2 text-2xl"
            >
                {soundEnabled ? <BiSolidVolumeLow /> : <BiSolidVolumeMute />}
            </button>
        </div>
    );
}