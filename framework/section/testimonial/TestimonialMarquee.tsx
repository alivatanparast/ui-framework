import {Marquee} from "@/framework/animation/Marquee";

interface Testimonial {
  name: string;
  image: string;
  description: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

function TestimonialCard({
                           testimonial: {image, name, description},
                         }: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className="flex h-32 w-96 overflow-hidden rounded-xl border bg-background dark:border-zinc-700"
      key={name}
    >
      <div className="relative h-full w-32 flex-shrink-0 overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover"/>
      </div>
      <div className="px-4 py-2">
        <span className="block text-lg font-bold text-foreground">{name}</span>
        <span className="-mt-1 mb-1 block text-sm font-medium leading-loose text-muted-foreground">
          Founder of BAC
        </span>
        <span className="block text-sm text-foreground">{description} </span>
      </div>
    </div>
  );
}

function ScrollingTestimonials({data}: TestimonialProps) {
  return (
    <div className="">
      <Marquee className="[--duration:80s]" pauseOnHover applyMask={false}>
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial}/>
        ))}
      </Marquee>

      <Marquee reverse className="[--duration:80s]" pauseOnHover applyMask={false}>
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial}/>
        ))}
      </Marquee>

      {/*<Marquee className="[--duration:80s]" pauseOnHover applyMask={false}>*/}
      {/*  {data.map((testimonial) => (*/}
      {/*    <TestimonialCard key={testimonial.name} testimonial={testimonial}/>*/}
      {/*  ))}*/}
      {/*</Marquee>*/}
    </div>
  );
}


export default function TestimonialMarquee() {
  return (
    <ScrollingTestimonials data={[
      {
        "name": "John Doe.",
        "image": "https://plus.unsplash.com/premium_photo-1717529137991-510ad3be15d9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!"
      },
      {
        "name": "Paul A",
        "image": "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!"
      },
      {
        "name": "Jeff Roe",
        "image": "https://images.unsplash.com/photo-1560298803-1d998f6b5249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!"
      },
      {
        "name": "Mex Q",
        "image": "https://images.unsplash.com/photo-1518287010730-4386819bf3e9?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!"
      },
      {
        "name": "Cristina W",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!"
      },
      {
        "name": "Lanna Del Rey",
        "image": "https://images.unsplash.com/photo-1581092916357-5896ebc48073?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "
      },
      {
        "name": "Paul Logan",
        "image": "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "
      }
    ]}/>
  )
}
