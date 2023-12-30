import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Dashboardstats } from '../../services/AdminApi';
import { Loader } from '../../components/Loading/Loader';
import { TrendingTopics,TrendingBlogs } from '../../services/BlogsApi';

function AdminHomePage() {
  const [dashstats,setdashstats]= useState(null)


    const fetchDashstats = async()=>{
      try {
        const ress = await Dashboardstats()
        setdashstats(ress.data)
      } catch (error) {
        console.error(error)
      }
    }
  



    const [chartConfig, setChartConfig] = useState({
      type: "pie",
      width: 280,
      height: 280,
      series: [],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
        legend: {
          show: false,
        },
      },
    });


    const fetchMostTopics = async()=>{
      try {
        const ress = await TrendingTopics()
        const topTopics =ress.data
        setChartConfig(prevConfig => ({
          ...prevConfig,
          series: topTopics.map(topic => topic.num_blogs),
          options: {
            ...prevConfig.options,
            labels: topTopics.map((topic) => topic.topic),
          },
        }));
      } catch (error) {
        console.error(error);
      }
    }

  const [chartConfig3,setchartConfig3] =useState({
    type: "donut",
    width: 280,
    height: 280,
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FC3106", "#0624FC", "#F98903", "#049D0B","#1e88e5"],
      legend: {
        show: false,
      },
    },
  })

  const fetchMostLikedBlogs = async()=>{
    try {
      const ress = await TrendingBlogs()
      const topblogs =ress.data
      setchartConfig3(prevConfig => ({
        ...prevConfig,
        series: topblogs.map(blog => blog.likes),
        options: {
          ...prevConfig.options,
          labels: topblogs.map((blog) => blog.title),
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const chartConfig1 = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfig2 = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  
  useEffect(()=>{
    document.title="InsighIT | Dashboard";
    fetchDashstats()
    fetchMostTopics()
    fetchMostLikedBlogs()
  },[])

  if (!dashstats){
    return <Loader/>
  }
  
  return (
    <div className='h-[48rem] overflow-y-auto overflow-x-hidden hidescroll'>


<div className="p-4 bg-white rounded-lg md:p-8 grid grid-cols-3" id="stats" role="tabpanel" aria-labelledby="stats-tab">
           
           <div className="flex flex-col items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.users_count}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Users</dd>
           </div>
           <div className="flex flex-col items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.premium_users_count}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Premium Users</dd>
           </div>
           <div className="flex flex-col items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.total_sales}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Total Sales</dd>
           </div>
           <div className="flex mt-8 flex-col items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.total_blogs_count}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Total Blogs</dd>
           </div>
           <div className="flex mt-8 flex-col  items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.Admin_wallet_balance}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Wallet Balance</dd>
           </div>
           <div className="flex mt-8 flex-col items-center justify-center">
               <dt className="mb-2 text-3xl text-blue-800 font-extrabold">{dashstats.total_topics_count}</dt>
               <dd className="text-gray-500 dark:text-gray-400">Topics</dd>
           </div>
       
   </div>

   <div className='grid-cols-2 grid'>
    <Card className='ml-5 mr-5 mt-10 mb-10'>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Most used Topics
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize Most Used Topics in Pie chart
          
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>

    <Card className='ml-5 mr-5 mt-10 mb-10'>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Most Liked Blogs
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize Most Liked Blogs in Donut Chart
          
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig3} />
      </CardBody>
    </Card>
    </div>


  
     <Card className='ml-5 mr-5 mt-10'>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Line Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
           
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig2} />
      </CardBody>
    </Card>

    <Card className='ml-5 mr-5 mt-10 mb-10'>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Bar Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig1} />
      </CardBody>
    </Card>
    

        </div>
  )
}

export default AdminHomePage


