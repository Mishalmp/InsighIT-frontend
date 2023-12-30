import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { BlockUser,ListUser } from "../../services/AdminApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import NotificationModal from "../../components/Modal/NotificationModal";
import ReactPaginate from "react-paginate";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";




export default function UsersList() {
    const TABS = [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Blocked",
        value: "blocked",
      }];
    
    const TABLE_HEAD = ["Member","Name", "Email", "Status", "Action"];
  
    const [users, setUsers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const [itemsPerPage] = useState(8);
    const [selectedfilter,setselectedfilter]=useState('')

    useEffect(() => {
      document.title="InsighIT | Users";
      fetchUsers();
    }, [searchQuery,selectedfilter]);
  


    const fetchUsers = async () => {
      try {
        const response = await ListUser(searchQuery,selectedfilter); // Call your API function
        const data = response.data; // Assuming data is an array of user objects
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(offset, offset + itemsPerPage);

    return (
  <>
          <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={()=>setselectedfilter(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
               <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              />
            </div>
          </div>
          </CardHeader>
          <CardBody className="h-[38rem] overflow-y-auto overflow-x-hidden hidescroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {paginatedUsers.map((user, index) => {
                const isLast = index === paginatedUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={user.email}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" alt={user.first_name} size="sm" />
                          {/* <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.first_name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {user.email}
                            </Typography>
                          </div> */}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.first_name} {user.last_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {/* {org} */}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {/* {org} */}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={user.is_active ? "Active" : "Blocked"}
                            color={user.is_active ? "green" : "red"}
                          />
                        </div>
                      </td>

                      <td className={classes} >
                        <Tooltip content="Edit User">
                          <Button variant="text" style={{ width: "200px" }}>
                            {/* <PencilIcon className="h-4 w-4" /> */}
                            {user.is_active ? (
                              <NotificationModal
                                buttonText="Block"
                                modalTitle="Confirmation"
                                modalHeading="Do you want to block this user ?"
                                buttonColor="red"
                                modalContent="Note : User will not be able to access this account"
                                onOkClick={async () => {
                                  const data = { is_active: false };
                                  await BlockUser(user.id, data);
                                  await fetchUsers()

                                }}
                              />
                            ) : (
                              <NotificationModal
                                buttonText="Unblock"
                                modalTitle="Confirmation"
                                modalHeading="Do you want to Unblock this user ?"
                                buttonColor="green"

                                modalContent="Note : User will be able to access this account"
                                onOkClick={async () => {
                                  const data = { is_active: true };
                                  await BlockUser(user.id, data);
                                  await fetchUsers()

                                }}
                              />
                            )}
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
          {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </CardFooter>  */}
      </>
    );
  }