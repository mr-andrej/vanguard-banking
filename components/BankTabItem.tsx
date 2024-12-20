"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {cn, formUrlQuery} from "@/lib/utils";
import {BankTabItemProps, UrlQueryParams} from "@/types";

export const BankTabItem = ({account, appwriteItemId}: BankTabItemProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isActive = appwriteItemId === account?.appwriteItemId;

    const handleBankChange = () => {
        const urlQueryParams = {
            params: searchParams.toString(),
            key: "id",
            value: account?.appwriteItemId,
        } as UrlQueryParams;

        const newUrl = formUrlQuery(urlQueryParams);
        router.push(newUrl, {scroll: false});
    };

    return (
        <div
            onClick={handleBankChange}
            className={cn(`banktab-item`, {
                " border-blue-600": isActive,
            })}
        >
            <p
                className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
                    " text-blue-600": isActive,
                })}
            >
                {account.name}
            </p>
        </div>
    );
};