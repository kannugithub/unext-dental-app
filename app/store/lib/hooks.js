// import { useDispatch, useSelector, useStore } from "react-redux";

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch;
// // export const useAppSelector = useSelector;
// export const useAppStore = useStore;
// export const useAppSelector = (selector) => useSelector(selector, shallowEqual);

import { useDispatch, useSelector, shallowEqual } from "react-redux";

export const useAppDispatch = useDispatch;
export const useAppSelector = (selector) => useSelector(selector, shallowEqual);