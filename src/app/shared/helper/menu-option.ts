export interface MenuOption {
        text: String;
        label: string;
        icon?: string;
        route?: string;
        isActive?: boolean;
        isDisabled?: boolean;
        requiresAuth?: boolean; 
}