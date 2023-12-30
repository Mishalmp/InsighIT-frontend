import React, { useEffect } from 'react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom';
  import Paymentsuccess from '../../assets/payment success.svg'
  import paymentcancelled from '../../assets/payment cancelled.jpg'
  import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
  import { CreateSubscription,CreateFollowing,NotificationCreate } from '../../services/UserApi';

function Paymentresult() {

    const {userinfo}=useSelector((state)=>state.user) 
    const isSuccess = new URLSearchParams(window.location.search).get("success") === "true";
    const searchparams= new URLSearchParams(window.location.search)

    
    const { data, isError, error } = useQuery('subscription', async () => {

      
      if (isSuccess) {
        const sub_type = searchparams.get('subscription_type');
        const currentdate = new Date();
        let endDate;
  
        if (sub_type === 'basic_monthly' || sub_type === 'standard_monthly') {
          endDate = new Date(currentdate);
          endDate.setMonth(currentdate.getMonth() + 1);
        } else if (sub_type === 'basic_yearly' || sub_type === 'standard_yearly') {
          endDate = new Date(currentdate);
          endDate.setFullYear(currentdate.getFullYear() + 1);
        } else {
          throw new Error('Invalid subscription type');
        }
  
        const subscriptionData = {
          subscriber: searchparams.get('subscriber'),
          subscribed_to: searchparams.get('subscribed_to'),
          subscription_type: searchparams.get('subscription_type'),
          subscription_amount: searchparams.get('subscription_amount'),
          is_active: true,
          end_time: endDate,
        };
  
        await CreateSubscription(subscriptionData);
        await CreateFollowing({
          follower: searchparams.get('subscriber'),
          following: searchparams.get('subscribed_to'),
        });

        const values={

          user:searchparams.get('subscribed_to'),
          text:`${userinfo.first_name} Subscribed you. Type: ${searchparams.get('subscription_type')} `,
      }

        await NotificationCreate(values)
  
        return subscriptionData;
      }
  
      return null;
    });
        
    



  return (
    <div>
         <div className="flex justify-center items-center h-screen">
            {
                isSuccess?(
                <>
                
                    <img src={Paymentsuccess} className='w-[50rem]' alt="payment success" />
                    <Link to='/User/Home'>
                        <Button size="lg" variant="text" className="flex items-center ml-64 gap-2 text-deep-orange-900 font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 transform rotate-180"
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                          </svg>
                          Back to home
                        </Button>
                              </Link>
                  </>

                ):(
                    <>
                
                    <img src={paymentcancelled} className='w-[50rem]' alt="payment success" />
                    <Link to='/User/Home/'>
                        <Button size="lg" variant="text" className="flex items-center ml-64 gap-2 text-deep-orange-900 font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 transform rotate-180"
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                          </svg>
                          Back to home
                        </Button>
                              </Link>
                  </>


                )

            }
  
    </div>
      
    </div>
  )
}

export default Paymentresult
