// ? Icons
import { Award, Medal, Trophy } from 'lucide-react';

// ? Components
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';

interface RewardsProps {
  rewards: boolean;
}

export const Rewards = ({ rewards }: RewardsProps) => {
  return (
    <div className="flex gap-5 flex-wrap">
      {rewards ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="px-1" variant="ghost">
                <Award />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Recompensa #1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="px-1" variant="ghost">
                <Medal />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Recompensa #2</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="px-1" variant="ghost">
                <Trophy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Recompensa #3</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p>Sin recompensas</p>
      )}
    </div>
  );
};
