export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1170px] py-20">
      <h1 className="font-inter text-heading-small font-semibold">{title}</h1>
    </div>
  )
}
