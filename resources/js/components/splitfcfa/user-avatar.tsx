import type { MockMember } from '@/lib/splitfcfa-mock-data';
import { cn } from '@/lib/utils';

const TONE_CLASSES: Record<MockMember['tone'], string> = {
    primary: 'bg-primary text-on-primary',
    'primary-container': 'bg-primary-container text-on-primary-container',
    'secondary-container': 'bg-secondary-container text-on-secondary-container',
    'tertiary-container': 'bg-tertiary-container text-on-tertiary-container',
};

type UserAvatarProps = {
    member: MockMember;
    className?: string;
};

export function UserAvatar({ member, className }: UserAvatarProps) {
    return (
        <div
            className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full font-label-sm text-label-sm',
                TONE_CLASSES[member.tone],
                className,
            )}
        >
            {member.name.charAt(0).toUpperCase()}
        </div>
    );
}
