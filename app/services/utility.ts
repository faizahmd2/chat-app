export function getMessageTime(dateString) {
    const now:any= new Date();
    const pastDate:any = new Date(dateString);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);

    if (diffInSeconds < 60) {
        return "Now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hr ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
        return "Yesterday";
    }

    if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7); // Difference in weeks
    if (diffInWeeks === 1) {
        return "1 week ago";
    }

    return `${diffInWeeks} weeks ago`;
}