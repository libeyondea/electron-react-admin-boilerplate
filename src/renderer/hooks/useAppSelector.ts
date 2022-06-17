import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from 'renderer/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
