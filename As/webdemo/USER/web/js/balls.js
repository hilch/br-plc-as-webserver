var el, c, w, h, t, l, p, clr, n, M, r, f, i, x, y;
var idBallInterval = false;

function initBallAnimation()
{
	el = document.getElementById('myCanvas1');
	c = el.getContext('2d');
	w = el.width;
	h = el.height;
	t = el.offsetTop;
	l = el.offsetLeft;
	p = [];
	clr = ['red', 'green', 'blue', 'yellow', 'purple'];
	n = 50;
	M = Math;
	r = M.random;
	f = M.floor;
	
	for (i = 0; i < n; i++) { 
		p.push({ x: w / 2, y: h / 2, vx: r() * 12 - 6, vy: r() * 12 - 6, r: r() * 4 + 3, clr: f(r() * clr.length) });}
     
	el.onmousemove = function(e) 
	{ 
		x = e.pageX - l;
		y = e.pageY - t;
		for (i = 0; i < n; i++) 
		{	 
			if (M.abs(x - p[i].x) < 20 && M.abs(y - p[i].y) < 20) 
			{ 
				p[i].vx = (x - p[i].x) / 3;
				p[i].vy = (y - p[i].y) / 3;
			} 
		} 
	};
			
	el.onclick = function(e) 
	{ 
		x = e.pageX - l;
		y = e.pageY - t;
		for (i = 0; i < n; i++) 
		{ 
			p[i].vx = (x - p[i].x) * r() / 20;
			p[i].vy = (y - p[i].y) * r() / 20;
		} 
	};
		
	if( idBallInterval == false )
		idBallInterval = window.setInterval( ballAnimation, 60);	
		
}


function ballAnimation()
{ 
        c.fillStyle = 'rgb(0,129,227)';
        c.fillRect(0, 0, w, h);
        for (i = 0;	i < n; i++) 
        { 
                c.fillStyle = clr[p[i].clr];
                p[i].vx *= 0.99;
                p[i].vy *= 0.99;
                p[i].x += p[i].vx;
                p[i].y += p[i].vy;
                if (p[i].x < p[i].r || p[i].x > w - p[i].r) 
                { 
                        p[i].vx = -p[i].vx;
                        p[i].x += p[i].vx;
                } 
                if (p[i].y < p[i].r || p[i].y > h - p[i].r) 
                { 
                        p[i].vy = -p[i].vy;
                        p[i].y += p[i].vy;
                } 
                c.beginPath();
                c.arc(p[i].x, p[i].y, p[i].r, 0, M.PI * 2, true);
                c.fill();
        } 
};


function stopBallAnimation()
{
    window.clearInterval(idBallInterval);
	idBallInterval = false;
};


