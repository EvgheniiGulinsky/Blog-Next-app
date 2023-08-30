import {CategoriesEnum} from "@/src/app/api/types/types";
import {Tab} from "@/src/components/Tab";
import { Category } from "@/src/app/api/types/types";

interface TabsListProps {
  tab: CategoriesEnum;
  handleTabClick: (tab: CategoriesEnum) => void;
}

const categoryNames = Object.keys(CategoriesEnum).filter(
  (key) => isNaN(Number(key))
);

export const TabsList = (props: TabsListProps) => {
    const {tab, handleTabClick} = props;

    return (
        <div>
            {categoryNames.map((categoryName, index) => (
              <Tab
                key={index}
                clickable={true}
                active={CategoriesEnum[categoryName as Category] === tab}
                onClick={()=>handleTabClick(CategoriesEnum[categoryName as Category])}
              >
                  {categoryName}
              </Tab>
            ))}
        </div>
    );
};
