import { memo, Suspense } from "react"

import ClubsHome from "@/components/clubsHome/clubsHome";

const Clubs = () => (
    <Suspense>
        <ClubsHome />
    </Suspense>
)

export default memo(Clubs);