import { JSX } from "preact";
import Message from "../../lib/types/Message";

interface ConversationListProps {
    className?: string;
    header?: string | JSX.Element | null;
    messages: Message[];
    username: string;
}
export default ConversationListProps;