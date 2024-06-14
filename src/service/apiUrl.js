const BASE_URL = "http://localhost:8080/api/v1";

const AUTH_URL = `${BASE_URL}/auth`;
const AUTHOR_URL = `${BASE_URL}/author`;
const USER_URL = `${BASE_URL}/user`;
const BOOK_URL = `${BASE_URL}/book`;

// Auth Section
export const LOGIN_URL = `${AUTH_URL}/login`;
export const REGISTER_URL = `${AUTH_URL}/register`

// Author Section
export const AUTHOR_REGISTER_URL = `${AUTHOR_URL}/register`;
export const AUTHOR_GETALL_URL = `${AUTHOR_URL}/get-all`;

export const authorGetByEmailUrl = (email) => `${AUTHOR_URL}/get/${email}`;
export const authorUpdateByIdUrl = (id) => `${AUTHOR_URL}/update/${id}`;
export const authorDeleteByEmailUrl = (email) => `${AUTHOR_URL}/delete/${email}`;

// Book Section
export const BOOK_REGISTER_URL = `${BOOK_URL}/register`;
export const BOOK_GETALL_URL = `${BOOK_URL}/get-all`
export const BOOK_UPDATE_URL = `${BOOK_URL}/update`;

export const bookGetByIsbnUrl = (isbn) => `${BOOK_URL}/get/${isbn}`
export const bookGetByAuthorEmailUrl = (email) => `${BOOK_URL}/get/by-author/${email}`
export const bookSearchByIsbnUrl = (isbn) => `${BOOK_URL}/search/${isbn}`;
export const bookDeleteByIsbnUrl = (isbn) => `${BOOK_URL}/delete/${isbn}`;
export const bookLikeByUserIdAndBookIsbn = (bookIsbn, userId) => `${BOOK_URL}/${userId}/like/${bookIsbn}`

// User Section
export const USER_GETALL_URL = `${USER_URL}/get-all`;

export const userGetByIdUrl = (id) => `${USER_URL}/get/by-id/${id}`;
export const userGetByUsernameUrl = (username) => `${USER_URL}/get/by-username/${username}`;
export const userUpdateByIdUrl = (id) => `${USER_URL}/update/${id}`;
export const userDeleteByIdUrl = (id) => `${USER_URL}/delete/${id}`;