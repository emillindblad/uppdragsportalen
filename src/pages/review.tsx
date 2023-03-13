
import { NextPage } from "next";
import HomePageSkeleton from "../components/homepageSkeleton";

/**
 * Handles the Home-page for the admin accounts, which is where you review Assignments. 
*/

const Review: NextPage = () => {

    return(
        <>

    <HomePageSkeleton id={"review"} title={"Granska uppdrag"}/>
    </>
    );
}
export default Review;