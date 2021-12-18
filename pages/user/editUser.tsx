import EditDisplayName from "../../components/editUser/EditDisplayName";
import withAuth from "../../components/withAuth";

const EditUser = () => {
  return (
    <div>
      <EditDisplayName />
    </div>
  );
};

export default withAuth(EditUser);
