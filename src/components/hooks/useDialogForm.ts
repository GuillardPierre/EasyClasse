import { useCallback, useState } from 'react'

type BaseDialogFormState<TValues> = {
  mode: 'create' | 'edit'
  values: TValues
  editingId: string | null
  open: boolean
}

type UseDialogFormParams<TValues> = {
  getInitialValues: () => TValues
  onSubmit: (params: {
    values: TValues
    mode: BaseDialogFormState<TValues>['mode']
    editingId: string | null
  }) => void
}

export type DialogFormBindings<TValues> = {
  open: boolean
  mode: 'create' | 'edit'
  values: TValues
  onFieldChange: <TKey extends keyof TValues>(
    field: TKey,
    value: TValues[TKey],
  ) => void
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  onCancel: () => void
}

export function useDialogForm<TValues>({
  getInitialValues,
  onSubmit,
}: UseDialogFormParams<TValues>) {
  const [state, setState] = useState<BaseDialogFormState<TValues>>({
    mode: 'create',
    values: getInitialValues(),
    editingId: null,
    open: false,
  })

  const resetState = useCallback(() => {
    setState({
      mode: 'create',
      values: getInitialValues(),
      editingId: null,
      open: false,
    })
  }, [getInitialValues])

  const openCreate = useCallback(() => {
    setState({
      mode: 'create',
      values: getInitialValues(),
      editingId: null,
      open: true,
    })
  }, [getInitialValues])

  const openEdit = useCallback((editingId: string, values: TValues) => {
    setState({
      mode: 'edit',
      values,
      editingId,
      open: true,
    })
  }, [])

  const handleFieldChange = useCallback(
    <TKey extends keyof TValues>(field: TKey, value: TValues[TKey]) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [field]: value },
      }))
    },
    [],
  )

  const handleSubmit = useCallback(() => {
    onSubmit({
      values: state.values,
      mode: state.mode,
      editingId: state.editingId,
    })
    resetState()
  }, [onSubmit, resetState, state])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        resetState()
      } else {
        setState((prev) => ({ ...prev, open }))
      }
    },
    [resetState],
  )

  return {
    openCreate,
    openEdit,
    dialogBindings: {
      open: state.open,
      mode: state.mode,
      values: state.values,
      onFieldChange: handleFieldChange,
      onOpenChange: handleOpenChange,
      onSubmit: handleSubmit,
      onCancel: resetState,
    } satisfies DialogFormBindings<TValues>,
  }
}
