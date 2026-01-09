import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import CitizenStatistics from "../../../components/Dashboard/Statistics/CitizenStatistics";
import StaffStatistics from "../../../components/Dashboard/Statistics/StaffStatistics";
import useRole from "../../../hooks/useRoll";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  return (
    <div>
      {role === "admin" && <AdminStatistics />}
      {role === "staff" && <StaffStatistics />}
      {role === "citizen" && <CitizenStatistics />}
    </div>
  );
};

export default Statistics;
