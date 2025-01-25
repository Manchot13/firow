import dynamic from "next/dynamic";
const Clock = dynamic(() => import("@/components/clock/clock"), {
	ssr: false,
});

export default function ClockModal() {

    return (
		<main className="relative">
			<div className="m-auto text-black w-fit">
				<Clock />
			</div>
		</main>
    );
}
