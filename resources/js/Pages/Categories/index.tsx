import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { CategoryBudgetSummary } from "./_components/CategoryBudgetSummary";
import { CategoryGrid } from "./_components/CategoryGrid";
import { CategoryAddDialog } from "./_components/CategoryAddDialog";

export default function Categories() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AppLayout>
            <Head title="Categories" />

            <PageHeader
                title="Categories"
                description="Manage your budget categories"
            >
                <CategoryAddDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            </PageHeader>

            <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
                <CategoryBudgetSummary />
                <CategoryGrid />
            </div>
        </AppLayout>
    );
}
