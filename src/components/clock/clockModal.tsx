import dynamic from "next/dynamic";
const Clock = dynamic(() => import("@/components/clock/clock"), {
	ssr: false,
});

export default function ClockModal() {

    return (
		<main className="relative pt-[5%] pr-[5%]">
			<div className="m-auto text-black font-bold w-fit">
				<Clock />
			</div>
		</main>
    );
}
