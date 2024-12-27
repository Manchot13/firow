import dynamic from "next/dynamic";
const Clock = dynamic(() => import("@/components/clock/clock"), {
	ssr: false,
});


export default function ClockModal() {

    return (
		<main className="absolute">
			<div className="m-auto text-black text-6xl font-bold w-fit">
				<Clock />
			</div>
		</main>
    );
}
