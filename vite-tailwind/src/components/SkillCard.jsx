import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Card";

const SkillCard = ({ title, description, icon: Icon }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default SkillCard;
