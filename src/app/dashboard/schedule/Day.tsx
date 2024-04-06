import { ScheduleData } from "../../../types/schedule";

const Day = (props: any) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {props.scheduleData.map((row: ScheduleData[]) => {
                if (row.length === 0) {
                    return <div className="h-0 pb-36"></div>;
                } else if (row.length === 1) {
                    return row[0].width ? (
                        <div className="flex gap-4 h-36">
                            <div
                                className={`event w-1/2 ${row[0].type}`}
                                style={{
                                    minHeight: `${
                                        row[0].height * 144 +
                                        (row[0].height - 1) * 16
                                    }px`,
                                    marginTop: `${
                                        row[0].heightOffset * 144 +
                                        row[0].heightOffset * 16
                                    }px`,
                                }}
                            >
                                <p className="font-bold text-xl">
                                    {row[0].title}
                                </p>
                                <p>{row[0].description}</p>
                                <p>
                                    {row[0].startTime}{" "}
                                    {row[0].endTime && (
                                        <span>- {row[0].endTime}</span>
                                    )}{" "}
                                    {row[0].location && <span>@</span>}{" "}
                                    {row[0].location}
                                </p>
                            </div>
                            <div className="w-1/2"></div>
                        </div>
                    ) : (
                        <div
                            className={`event ${row[0].type}`}
                            style={{
                                minHeight: `${
                                    row[0].height * 144 +
                                    (row[0].height - 1) * 16
                                }px`,
                                marginTop: `${
                                    row[0].heightOffset * 144 +
                                    row[0].heightOffset * 16
                                }px`,
                            }}
                        >
                            <p className="font-bold text-xl">{row[0].title}</p>
                            <p>{row[0].description}</p>
                            <p>
                                {row[0].startTime}{" "}
                                {row[0].endTime && (
                                    <span>- {row[0].endTime}</span>
                                )}{" "}
                                {row[0].location && <span>@</span>}{" "}
                                {row[0].location}
                            </p>
                        </div>
                    );
                } else if (row.length === 2) {
                    return (
                        <div className="flex gap-4 h-36">
                            <div
                                className={`event w-1/2 ${row[0].type}`}
                                style={{
                                    minHeight: `${
                                        row[0].height * 144 +
                                        (row[0].height - 1) * 16
                                    }px`,
                                    marginTop: `${
                                        row[0].heightOffset * 144 +
                                        row[0].heightOffset * 16
                                    }px`,
                                    width: `${row[0].width * 100}% !important`,
                                }}
                            >
                                <p className="font-bold text-xl">
                                    {row[0].title}
                                </p>
                                <p>{row[0].description}</p>
                                <p>
                                    {row[0].startTime}{" "}
                                    {row[0].endTime && (
                                        <span>- {row[0].endTime}</span>
                                    )}{" "}
                                    {row[0].location && <span>@</span>}{" "}
                                    {row[0].location}
                                </p>
                            </div>
                            <div
                                className={`event w-1/2 ${row[1].type}`}
                                style={{
                                    minHeight: `${
                                        row[1].height * 144 +
                                        (row[1].height - 1) * 16
                                    }px`,
                                    marginTop: `${
                                        row[1].heightOffset * 144 +
                                        row[1].heightOffset * 16
                                    }px`,
                                    width: `${row[1].width * 100}% !important`,
                                }}
                            >
                                <p className="font-bold text-xl">
                                    {row[1].title}
                                </p>
                                <p>{row[1].description}</p>
                                <p>
                                    {row[1].startTime}{" "}
                                    {row[1].endTime && (
                                        <span>- {row[1].endTime}</span>
                                    )}{" "}
                                    {row[1].location && <span>@</span>}{" "}
                                    {row[1].location}
                                </p>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Day;
