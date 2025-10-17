function About() {
  return (
    <div>
      <p>
        Hi, my name is{" "}
        <span className="font-semibold text-cyan">Hicham Moulili!</span>
      </p>
      <p>
        I'm a&nbsp;
        <span className="font-semibold text-cyan">Full Stack developer</span>
        &nbsp;based in Morocco.
      </p>
      <p>
        I specialize in building web applications using modern technologies and
        frameworks.
      </p>

      <ul className="mt-2 list-disc list-inside space-y-1">
        <li>
          run <pre className="text-blue inline">skills</pre> to explore my skill
          set
        </li>
        <li>
          run <pre className="text-blue inline">education</pre> to show my
          academic info
        </li>
        <li>
          run <pre className="text-blue inline">contact</pre> to collaborate
          with me
        </li>
      </ul>
    </div>
  );
}

export default About;
