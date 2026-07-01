import { cn } from "@/lib/utils";

/**
 * TextAnimation
 * Renders two big words whose fill is an image (background-clip: text)
 * that slides back and forth for an animated "moving texture" effect.
 *
 * Adapted from the shadcn-style TSX snippet to JSX for this CRA project.
 */
export function TextAnimation({
  line1 = "Text",
  line2 = "Animation",
  image1 =
    "https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
  image2 =
    "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
  className,
  textClassName,
}) {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col items-center justify-center",
        className
      )}
    >
      <p
        className={cn(
          "m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text bg-contain bg-clip-text opacity-80 leading-tight",
          textClassName
        )}
        style={{
          backgroundImage: `url('${image1}')`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      >
        {line1}
      </p>
      <p
        className={cn(
          "m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text-reverse bg-contain bg-clip-text opacity-80 leading-tight",
          textClassName
        )}
        style={{
          backgroundImage: `url('${image2}')`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      >
        {line2}
      </p>
    </div>
  );
}

// Keep the original demo export name as well.
export const Component = TextAnimation;

export default TextAnimation;
