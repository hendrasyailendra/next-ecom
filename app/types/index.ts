export interface MenuItems {
	href: string;
	icon: React.JSX.Element;
	label: string;
}

export interface NewUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface EmailVerifyRequest {
	userId: string;
	token: string;
}
