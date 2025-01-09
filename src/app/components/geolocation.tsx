'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'; // For dropdown

const GEOCODING_API_KEY = 'f13bd0a6b1414b439992e3727c19bcf3'; // OpenCage API key
const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

function Geolocation() {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, (error) => {
            console.error("Error getting geolocation: ", error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const fetchProvince = async () => {
                try {
                    const response = await axios.get(GEOCODING_API_URL, {
                        params: {
                            q: `${latitude},${longitude}`,
                            key: GEOCODING_API_KEY
                        }
                    });
                    const result = response.data.results[0];
                    // Check for provinces or states based on the country/region
                    const province = result.components.state || result.components.province || result.components.region;
                    setProvince(province);
                } catch (error) {
                    console.error("Error fetching province data: ", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProvince();
        }
    }, [latitude, longitude]);

    const handleNavigation = (path: string) => {
        window.location.href = `http://localhost:3000/products/${path}`;
    };

    const renderButton = () => {
        switch (province?.toLowerCase()) {
            case 'punjab':
                return (
                    <Button onClick={() => handleNavigation('punjabi')} className=" mx-auto">
                        Browse Punjabi Products
                    </Button>
                );
            case 'kpk':
                return (
                    <DropdownMenu>
                        <DropdownMenuItem onClick={() => handleNavigation('saraiki')}>
                            Browse Saraiki Products
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNavigation('pashtun')}>
                            Browse Pashtun Products
                        </DropdownMenuItem>
                    </DropdownMenu>
                );
            case 'sindh':
                return (
                    <Button onClick={() => handleNavigation('sindhi')} className=" mx-auto">
                        Browse Sindhi Products
                    </Button>
                );
            case 'balochistan':
                return (
                    <Button onClick={() => handleNavigation('balochi')} className=" mx-auto">
                        Browse Balochi Products
                    </Button>
                );
            case 'kashmir':
                return (
                    <Button onClick={() => handleNavigation('kashmiri')} className=" mx-auto">
                        Browse Kashmiri Products
                    </Button>
                );
            default:
                return (
                    <Button onClick={() => handleNavigation('all')} className=" mx-auto">
                        Browse All Products
                    </Button>
                );
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            {loading ? (
                <p>Loading...</p>
            ) : (
                province ? (
                    <div className="text-center ">
                        <p>{province}</p>
                        {renderButton()}
                    </div>
                ) : (
                    <p>Pakistan</p>
                )
            )}
        </div>
    );
}

export default Geolocation;
