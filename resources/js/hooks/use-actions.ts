import { useCallback, useState } from "react";

interface ActionState<TAction extends string, TParams = unknown> {
    name: TAction;
    params?: TParams;
}

interface UseActionsReturn<TAction extends string> {
    action: ActionState<TAction> | null;
    isAction: (name: TAction) => boolean;
    setAction: <TParams = unknown>(name: TAction, params?: TParams) => void;
    clearAction: () => void;
}

export function useActions<
    TAction extends string,
>(): UseActionsReturn<TAction> {
    const [action, setActionState] = useState<ActionState<TAction> | null>(
        null,
    );

    const isAction = useCallback(
        (name: TAction) => action?.name === name,
        [action],
    );

    const setAction = useCallback(
        <TParams = unknown>(name: TAction, params?: TParams) => {
            setActionState({ name, params });
        },
        [],
    );

    const clearAction = useCallback(() => {
        setActionState(null);
    }, []);

    return { action, isAction, setAction, clearAction };
}
