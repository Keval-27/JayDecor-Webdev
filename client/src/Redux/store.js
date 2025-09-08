import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "./Features/Projects/projectsApi";
import contactsApi from "./Features/ContactForm/contactsApi";
import consultantsApi from "./Features/ConsultantForm/consultantsApi";
import designsApi from "./Features/Designs/designsApi";
export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
    [contactsApi.reducerPath]:contactsApi.reducer,
    [consultantsApi.reducerPath]:consultantsApi.reducer,
    [designsApi.reducerPath]:designsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware,contactsApi.middleware,consultantsApi.middleware,designsApi.middleware)
});