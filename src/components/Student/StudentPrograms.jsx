import { useQuery } from "@tanstack/react-query";
import { indexStudentPrograms } from "../../services/student/program";
import Spinner from "../Applicant/Spinner";
import { useAuth } from "../../services/AuthContext";

function StudentPrograms() {
  const { token } = useAuth();

  const fetchData = async () => {
    const programs = await indexStudentPrograms(token);
    console.log(programs);
    return programs;
  };

  const { data: programs, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["StudentPrograms"],
  });

  // if (!isLoading) {
  //   var filteredPrograms = programs.filter((program) =>
  //     program.name.includes(searchTerm)
  //   );
  // }

  if (isLoading) return <Spinner />;

  return (
    <div className="Programs">
      <div className="Programs__in">
        <div className="Programs__in__top">
          <h2>دبلوماتي</h2>
          {/* <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
        </div>

        <ol>
          {programs?.map((diploma) => (
            <li key={diploma.id}>
              <button>{diploma.name}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default StudentPrograms;
