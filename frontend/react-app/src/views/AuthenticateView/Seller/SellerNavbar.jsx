import { Drawer } from "antd";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SellerNavbar() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-slate-200 font-serif h-12 text-sm drop-shadow-md">
        <div className="text-blue-700 text-3xl hover:text-blue-500 hover:cursor-pointer pl-2">
          logo
        </div>
        <div>
          <ul className="flex justify-center gap-5  ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Create Property
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-property"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                My Property
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="">
            <input
              type="text"
              placeholder="search"
              className="border border-gray-400 bg-white  rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>
          <div
            className="inline-flex h-4 w-4 m-2 hover:cursor-pointer"
            onClick={showDrawer}
          >
            <div>
              <FontAwesomeIcon icon="fa-solid fa-gear" />
            </div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///8JCQsAAAAAAAP29vYmJiYFBQjy8vLk5OT6+vpISEgzMzPt7e3p6emOjo7Q0NCxsbG8vLw8PDzGxsZfX1/X19fe3t52dnYZGRmqqqosLCyioqJ8fHycnJwTExRra2tTU1OGhoYfHyB//P0+AAAJq0lEQVR4nN1ca7uyKhB9xbuWmuYtM63//yNPJgOICmjq7jnzcW/D5QAzaxaXf/++s3MStKbGmNkGyfnLRr8zN4gRQjoLSn//IQ7cv8MUvQFoE/b+c/RXmIJpSD2s4G8w5ciaw6RpFsr/AlM16ybsrOp4TKEG49tCAwP36Vp4OKgrIpAKj7GCwELXozGliIxoZ/gfh4x/lB4MqkE4Kk3M/QhHLtQci+kU96BQOfXfEv8zPh0KKnx8nIG8ydDteh9U+mOfoX5OLlGUpKNXX5Bw2uNwgS7Dtsrg+ayj8KscdCq9uEsZyPRyDheAmskm0RhU2Pg4Zjy8wFgNqYao8wlEbTJ+qzV0BYvZGmJOGxrBupRdr/NWYg6zCEI5830LQUWPYfjX0dWZ/qXQxsnWQh5taBmoicyNXtliTPVUskUeaagPU9bc9BqCqiYb85eG1mCaAKAb9lWCB/JthmMmjx6UxzWm09SooceyHqR+wsmWNBR3rjFKHYdsb6aB8w2jbpPsSRp7Z8mbSYnqMl8FTDP3Miprj8B6D/f66UG78/yyJamR/PQ9JsvQyS50gKFC3VfETxa6993jJjF1Fn0Niu25NpLRyLYQRCfHIw0o+4rBVJM/nr0xpZude91nXBH/MA3+BkX1UvNVRWMcm2yNMSr0FDTj3AbPW4PG3IW+SmC8sH7q7OTx8U9MwpOCeR5xjdkUlSn3lQEfOCZK7x5hX6PVkw1Qc1pE2jJHHU1ReVJ+UxOSO/HO8hMedP2TCuWsxL14OAUH4+jN+Eo0Cjo7vRDGNDnZjfLqmcXLb++KOeJ0qesym06+Mfl+ybCKILzM9s0pDdPlWWvKiK9krsIxD903ea3MgFKbwlFl+PixY7i1A68T9l9a9Mz7qIINWLNwIieWJX9oQzurjBagQfPpY2PDoIT14Yha72yuCiio5mThbCuDmkioZTkm6jPVQaCaqfJwZJ6oGN/cAkgfYuH2Cdx7TQG01C4Q0a/i2tTBZApJwG+DyRLlWWpuA+i93VGZ8CpT9mRIZDht51QTACZNzj2fhOY0q1UIFQMia6notW5LUO2qhEO5o/YW2yQkdk9X4d5TVdsp+dozL0NEVI094CvUqItIrnHOsrOr/gOrFyDVc4fTV0fIV/oMN4zuMSj7fl6qqYc49UvDAbU7UmL0nZ2CTs6nRXUn9QcK0aQvL5dk2UCFpnYW5vxyX68e5tIC7Ia/e1aNWAvKzjnVkBh65BJv5UtTv93HKr0Q11LRyEkDd4lfB1RqXriZ+UEr+oF7n1+C7IdLLhrx2UuFdVIDjUPI508to0Ayi2vsH1tRF+aEuAjnuO0kZVlVrQWPC0ar01I3dZEgboK6DprYZ1eVUSt4X0rSmXmtyjJxproleb6GH4vi+RZPrLL3CC6kQfsSPFiJVOCrhqDqzXwm3BPplV84twSOMohOZ6FbyX2iXd6oZiogled4+MI3gOtgukdopFGLMl9OPzKY8LrNaK2ChJvxM8Ua7BwIxnNbVLpfyCt93uPYEp88IqhUklGY0ymTGa8IvD0wP59BJNfYdRHOiAI8q/93lvpjZ1Xw4RYPKRZVYmQyi4RBIpEKGZMRmNzAAcm54KYBuvJjd2Bn4gNhgCHysLgwykqPm/RF92eQOXXkBUkYho6EcOZArmfGE1gC5ZqEXLqGE4ZJ0JJljJoSTR1VSkQoK3C8lwoOuAaRpVDAVkMi8Wxg8NKSEKxWXkk/gVCnSKsjcG1C1DTV/TIv9TcB/pdi00BnKlhOVCgJP+bgHz4USh3jsaw6SLWeIze4rFAmy7APQolxgNSjyuSwEuX985eBuuP3KG2DCBcq4BiUvxAUTsW62vKhA2qzYlm7EhRO7YqvwZ+AYkUJZyWo7KUv6ZC+s3XV5f6VoFJcRCqKH4F6AfkVKG05KOXdXf8vUD/YfasGOjL3Heg/GRJ+MngelGZ+MiH/JHVZSvLgRQtI3kOxaUry1tJhf086TAsHtR2FuxUOFVM4MCVWW3clVpiJleetS6yuwuJLLFqMUumrvQhgKRajmVIxapdXeKmGH/8Uo+Oy/Y1OVJFvWLZf4rGYgBWDiS2PqJjvnM0EDvc5sZmULGpNSUGC4LKVFMRvkRtIQdOimTcfHrcRzYKxm4ZxKRvJi6ItEwvkxXn9JuT80Mk9fPBInuZwHoiqbV6IJSP+pC7ExtykHwuxn090kqisyopsHBUEPU6yvsXN8yNZ35Ql6xDeYl2rWcmaMdjaJUruX4v7d0gkkhjMfYSYiMuXQe6ixGDDl6vuQMrw85LsVooXjMQJHqdQ8foPa0AEZNlduLQmednCWo2kHQXPrl+EXAgKzgdZSIXKnALvMVyufSgt10IBqUbfL4RCKK7EuWGZw+kTdFNd2MaKttqWdLKhGalxM0BmO2nmGAv2DEBRYcpH+vlF4uzOG/NqQjWkJcidYNr7zKdBlhhkwyQjG6323+oZkO+XxHTCvw84G0uoBmqFHejCyZJDTsaeNEAlLIThDI52BCa6YCvOZ6ViftnK4KCSYAkdpql05G1nfQeim+iZfkLo5mGnYrGoJgygNVbEDjvVDDqUaPqBAnNY9+GsLOy+6MiI8I8St1b0ED5OINthvJVd8PF4yVZPCBzKu5q+MSAkusQHJHULI8c2Bn6SEj27IIRib18lpOiVSqLgqt19lWiEJMi1Y6ISjH1lJFXu+XEbREu20DtpmI45O/GTEkmihwU5X7lk/wdCfqMIK7u3/qswvWs0DI+Mn5QqBwYV66ssZk/rvstfhYolbOnRu0EnMX5SJG4pg4r88cKXnQrnKgON+Q1CV1JVJBZ5g/JJNMekqHAEKSfOgcuWZxquSiUS6XI/dZZScdCvTobRHeHnMXVUUFiDPcef4XX3G7iVttxPnTkv8ruhwGOxVTryBcl9JDl/Gmuf94Ke2F5YCFBfaZrFtnqL/RcVNOdns+2zn8U0wMh8iw9XOcW4wyzUJG/fODWRrOcPJ8I5Tx3FQZ1P9v6KgimN+YYssnmQFkezroIFH63sujgcNbbyEJoT8zdLUIIBh8RncxG5BQDTRccfouIPSyubfWcHNfJYOmoDZZwhHeEDlhMBJTuBLVSsP4EW3kli8arhTOtLacWbJT4WkXMQCDVfHRq2w+e1bfPS4TWepbeV/Ovyee7Fty6h78VrV4Dq7OTINmx+Y8svmznA1lzLs7uFhcoFRsdVtR+Dhc/p/oPek1+FsK3BpVjW1KVY1t9civWb14f95EVrv3klnfzyvmNOWHPW/OA1h795IeRvXp0Jl4xyxzn++JLRf/11rC8W1GuD61j/A4nhfhvl6AeeAAAAAElFTkSuQmCC"
              alt="image not found"
            />
          </div>
        </div>
        <Drawer title="Settings" onClose={onClose} open={open}>
          <p>Change Property Status</p>
          <p>Edit Profile</p>
          <p>Add Discount to all properties</p>
        </Drawer>
      </div>
    </>
  );
}

export default SellerNavbar;
