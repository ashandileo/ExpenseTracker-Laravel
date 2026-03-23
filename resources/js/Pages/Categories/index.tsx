import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useActions } from "@/hooks/use-actions";
import { CategoryBudgetSummary } from "./_components/CategoryBudgetSummary";
import { CategoryGrid } from "./_components/CategoryGrid";
import { CategoryAddDialog } from "./_components/CategoryAddDialog";
import { CategoryEditDialog } from "./_components/CategoryEditDialog";
import { Category } from "./constants";

enum Actions {
  CategoryAdd = "category-add",
  CategoryEdit = "category-edit",
  CategoryDelete = "category-delete",
}

export default function Categories() {
  const { action, isAction, setAction, clearAction } = useActions<Actions>();

  function handleDeleteConfirm() {
    // TODO: implement actual delete logic
    clearAction();
  }

  return (
    <AppLayout>
      <Head title="Categories" />

      <PageHeader
        title="Categories"
        description="Manage your budget categories"
      >
        <CategoryAddDialog
          open={isAction(Actions.CategoryAdd)}
          onOpenChange={(open) =>
            open ? setAction(Actions.CategoryAdd) : clearAction()
          }
        />
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
        <CategoryBudgetSummary />
        <CategoryGrid
          onEdit={(category) => setAction(Actions.CategoryEdit, category)}
          onDelete={(category) => setAction(Actions.CategoryDelete, category)}
        />
      </div>

      <CategoryEditDialog
        category={(action?.params as Category) ?? null}
        open={isAction(Actions.CategoryEdit)}
        onOpenChange={(open) => !open && clearAction()}
      />

      <ConfirmationDialog
        open={isAction(Actions.CategoryDelete)}
        onOpenChange={(open) => !open && clearAction()}
        title="Delete Category"
        description={`Are you sure you want to delete "${(action?.params as Category)?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </AppLayout>
  );
}
