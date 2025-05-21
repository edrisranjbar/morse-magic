import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Volume2, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsDialogProps {
  trigger?: React.ReactNode;
}

export const useSettings = () => {
  const [volume, setVolume] = useState(0.3);
  const [customSpeed, setCustomSpeed] = useState(1);
  const [useCustomSpeed, setUseCustomSpeed] = useState(false);

  const getSpeed = () => {
    if (useCustomSpeed) {
      return customSpeed;
    }
    return 1;
  };

  return {
    volume,
    setVolume,
    customSpeed,
    setCustomSpeed,
    useCustomSpeed,
    setUseCustomSpeed,
    getSpeed
  };
};

export const SettingsDialog = ({ trigger }: SettingsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    volume,
    setVolume,
    customSpeed,
    setCustomSpeed,
    useCustomSpeed,
    setUseCustomSpeed
  } = useSettings();

  const playTestSound = () => {
    // This is a placeholder - you'll need to implement the actual sound playing logic
    toast.success('Testing sound settings');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
            <span className="sr-only">Settings</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sound Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Volume</label>
                <span className="text-sm text-muted-foreground">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useCustomSpeed"
                  checked={useCustomSpeed}
                  onChange={(e) => setUseCustomSpeed(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="useCustomSpeed" className="text-sm font-medium">
                  Use Custom Speed
                </label>
              </div>
              {useCustomSpeed && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Speed</label>
                    <span className="text-sm text-muted-foreground">{customSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={customSpeed}
                    onChange={(e) => setCustomSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={playTestSound}
                className="w-full"
              >
                <Volume2 className="mr-2 h-4 w-4" />
                Test Sound
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 