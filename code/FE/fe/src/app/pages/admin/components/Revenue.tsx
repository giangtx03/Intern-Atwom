import React from 'react'
import RevenueBar from './RevenueBar'
import RevenuePie from './RevenuePie'

export default function Revenue() {
    return (
        <div className="d-flex justify-content-between align-items-center h-100">
            <div className='container'>
                <div className="row">
                    <div className="col-8">
                        <RevenueBar />
                    </div>
                    <div className="col-4">
                        <RevenuePie />
                    </div>
                </div>
            </div>
        </div>
    )
}
