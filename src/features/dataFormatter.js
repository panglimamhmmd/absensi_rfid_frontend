export const formatDate = (dateString) => {
    // Split the date string by '-'
    const [year, month, day] = dateString.split('-');

    // Array of month names
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Get the abbreviated month name
    const monthStr = monthNames[parseInt(month) - 1];

    // Format the date
    const formattedDate = `${monthStr}, ${day} ${year}`;
    return formattedDate;
};

export const formatTime = (timeString) => {
    // Split the time string by ':'

    if (!timeString) return timeString;
    const [hour, minute, second] = timeString.split(':');

    // Format the time
    const formattedTime = `${hour}:${minute}`;

    return formattedTime;
};
