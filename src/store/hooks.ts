import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from './themeSlice'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useThemeMode() {
  return useAppSelector((state) => state.theme.mode)
}

export function useIsDarkMode() {
  const mode = useThemeMode()
  return mode === 'dark'
}

export function useThemeActions() {
  const dispatch = useAppDispatch()

  return {
    toggleTheme: () => dispatch(toggleTheme()),
  }
}
