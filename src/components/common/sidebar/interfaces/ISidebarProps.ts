export default interface ISidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    heading: string;
}