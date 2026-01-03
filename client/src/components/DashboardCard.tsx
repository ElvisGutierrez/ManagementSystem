import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  to: string;
}

const DashboardCard = ({ title, description, to }: Props) => {
  return (
    <Link
      to={to}
      className="bg-[#1f2937] hover:bg-[#374151] transition rounded-xl p-6 shadow-lg flex flex-col gap-2"
    >
      <h2 className="text-xl font-semibold text-green-400">{title}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  );
};

export default DashboardCard;
