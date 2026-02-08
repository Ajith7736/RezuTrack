import { colors } from "@/components/ui/colors";

const Today = new Date().getDay()

export const Todaydata = {
    0: {
        value: 4,
        label: 'M',
        frontColor:
            Today === 0
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    1: {
        value: 1,
        label: 'T',
        frontColor:
            Today === 1
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    2: {
        value: 4,
        label: 'W',
        frontColor:
            Today === 2
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    3: {
        value: 2,
        label: 'T',
        frontColor:
            Today === 3
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    4: {
        value: 2,
        label: 'F',
        frontColor:
            Today === 4
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    5: {
        value: 1,
        label: 'S',
        frontColor:
            Today === 5
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
    6: {
        value: 6,
        label: 'S',
        frontColor:
            Today === 6
                ? colors.tailwind.indigo[500]
                : colors.tailwind.stone[200],
    },
};
