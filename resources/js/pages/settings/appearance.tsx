import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { SplitSettingsLayout } from '@/layouts/settings/split-settings-layout';

export default function Appearance() {
    return (
        <SplitSettingsLayout>
            <Head title="Apparence" />

            <h1 className="sr-only">Paramètres d&apos;apparence</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Apparence"
                    description="Choisissez l'apparence de votre interface"
                />
                <AppearanceTabs />
            </div>
        </SplitSettingsLayout>
    );
}
