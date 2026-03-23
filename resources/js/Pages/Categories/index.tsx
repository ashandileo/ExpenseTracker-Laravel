import { Head, router } from "@inertiajs/react";
import { toast } from "sonner";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useActions } from "@/hooks/use-actions";
import { CategoryBudgetSummary } from "./_components/CategoryBudgetSummary";
import { CategoryGrid } from "./_components/CategoryGrid";
import { CategoryAddDialog } from "./_components/dialogs/CategoryAddDialog";
import { CategoryEditDialog } from "./_components/dialogs/CategoryEditDialog";
import { Category } from "./constants";

enum Actions {
  CategoryAdd = "category-add",
  CategoryEdit = "category-edit",
  CategoryDelete = "category-delete",
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  const { action, isAction, setAction, clearAction } = useActions<Actions>();

  function handleDeleteConfirm() {
    const category = action?.params as Category;
    if (!category) return;

    router.delete(`/categories/${category.id}`, {
      onSuccess: () => {
        clearAction();
        toast.success("Category deleted successfully");
      },
    });
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
        <CategoryBudgetSummary categories={categories} />
        <CategoryGrid
          categories={categories}
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
